import React, { useMemo } from 'react';
import katex from 'katex';

interface MathRendererProps {
  content: string;
  className?: string;
  inline?: boolean;
}

/**
 * Renders text containing LaTeX expressions:
 * - Block math: `$$...$$` or `\\[...\\]`
 * - Inline math: `$..$` or `\\(...\\)`
 * - Preserves line breaks and basic markdown styling (bold, italics, lists)
 */
export const MathRenderer: React.FC<MathRendererProps> = ({
  content,
  className = '',
  inline = false,
}) => {
  const html = useMemo(() => {
    if (!content) return '';

    // Tokenize text into Math blocks and Normal text
    // Handles $$...$$, \[...\], $...$, \(...\)
    const regex = /(\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\]|\$[^\$\n]+?\$|\\\([\s\S]*?\\\))/g;
    
    let result = '';
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(content)) !== null) {
      const matchStart = match.index;
      const rawMatch = match[0];

      // Non-math text before this match
      if (matchStart > lastIndex) {
        const textSegment = content.substring(lastIndex, matchStart);
        result += formatText(textSegment);
      }

      // Render math
      let mathCode = '';
      let isDisplayMode = false;

      if (rawMatch.startsWith('$$') && rawMatch.endsWith('$$')) {
        mathCode = rawMatch.slice(2, -2).trim();
        isDisplayMode = true;
      } else if (rawMatch.startsWith('\\[') && rawMatch.endsWith('\\]')) {
        mathCode = rawMatch.slice(2, -2).trim();
        isDisplayMode = true;
      } else if (rawMatch.startsWith('$') && rawMatch.endsWith('$')) {
        mathCode = rawMatch.slice(1, -1).trim();
        isDisplayMode = false;
      } else if (rawMatch.startsWith('\\(') && rawMatch.endsWith('\\)')) {
        mathCode = rawMatch.slice(2, -2).trim();
        isDisplayMode = false;
      }

      try {
        const rendered = katex.renderToString(mathCode, {
          displayMode: isDisplayMode,
          throwOnError: false,
          output: 'htmlAndMathml',
          strict: false,
        });
        
        if (isDisplayMode) {
          result += `<div class="my-3 overflow-x-auto text-center py-2.5 px-3 bg-slate-100/90 dark:bg-[#0d1527] rounded-xl border border-slate-200 dark:border-slate-700/60 shadow-2xs">${rendered}</div>`;
        } else {
          result += `<span class="inline-math px-0.5">${rendered}</span>`;
        }
      } catch (err) {
        result += `<code class="text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-1 py-0.5 rounded text-xs">${escapeHtml(rawMatch)}</code>`;
      }

      lastIndex = matchStart + rawMatch.length;
    }

    // Trailing text
    if (lastIndex < content.length) {
      result += formatText(content.substring(lastIndex));
    }

    return result;
  }, [content]);

  if (inline) {
    return (
      <span
        className={`math-content inline text-inherit ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <div
      className={`math-content text-inherit leading-relaxed ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

function formatText(text: string): string {
  if (!text) return '';

  // Escape HTML entities to prevent XSS
  let escaped = escapeHtml(text);

  // Markdown bold: **text** or __text__
  escaped = escaped.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-inherit">$1</strong>');
  
  // Markdown italic: *text* or _text_
  escaped = escaped.replace(/\*(.*?)\*/g, '<em class="italic text-inherit opacity-90">$1</em>');

  // Convert bullet lists starting with "- " or "* "
  const lines = escaped.split('\n');
  const processedLines: string[] = [];
  let inList = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('- ') || trimmed.startsWith('• ') || trimmed.startsWith('* ')) {
      if (!inList) {
        processedLines.push('<ul class="list-disc list-inside my-1.5 space-y-1 pl-2">');
        inList = true;
      }
      processedLines.push(`<li>${trimmed.substring(2)}</li>`);
    } else {
      if (inList) {
        processedLines.push('</ul>');
        inList = false;
      }
      if (trimmed === '') {
        processedLines.push('<div class="h-2"></div>');
      } else {
        processedLines.push(`<p class="my-1">${line}</p>`);
      }
    }
  }

  if (inList) {
    processedLines.push('</ul>');
  }

  return processedLines.join('');
}

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export default MathRenderer;

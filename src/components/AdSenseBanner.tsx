import React, { useEffect, useRef, useState } from 'react';

interface AdSenseBannerProps {
  client?: string;
  slot?: string;
  format?: 'auto' | 'fluid' | 'horizontal' | 'rectangle';
  responsive?: boolean;
  className?: string;
  label?: string;
}

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

export default function AdSenseBanner({
  client = 'ca-pub-1887434028195350',
  slot = '',
  format = 'auto',
  responsive = true,
  className = '',
  label = 'Quảng cáo tài trợ'
}: AdSenseBannerProps) {
  const adRef = useRef<HTMLModElement>(null);
  const [adLoaded, setAdLoaded] = useState<boolean>(false);
  const [adError, setAdError] = useState<boolean>(false);

  useEffect(() => {
    // Check if running on localhost or non-approved cloud run dev preview
    const isDevPreview = 
      typeof window !== 'undefined' && 
      (window.location.hostname.includes('run.app') || 
       window.location.hostname.includes('localhost') || 
       window.location.hostname.includes('127.0.0.1') ||
       window.location.hostname.includes('webcontainer'));

    try {
      if (typeof window !== 'undefined') {
        // Push ad slot to adsbygoogle array
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        setAdLoaded(true);
      }
    } catch (e) {
      console.warn('AdSense push error or adblock detected:', e);
      setAdError(true);
    }
  }, [slot]);

  return (
    <div className={`w-full my-4 flex flex-col items-center justify-center overflow-hidden ${className}`}>
      {/* Small label above ad */}
      <div className="w-full max-w-4xl flex items-center justify-between px-2 mb-1">
        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500 select-none">
          {label}
        </span>
        <span className="text-[10px] text-slate-400 dark:text-slate-600 font-mono">
          Google AdSense
        </span>
      </div>

      <div className="w-full max-w-4xl min-h-[90px] bg-slate-100/70 dark:bg-[#0f172a]/70 rounded-2xl border border-dashed border-slate-300/80 dark:border-slate-700/80 p-2 flex flex-col items-center justify-center relative overflow-hidden transition-all">
        {/* Real AdSense Slot element */}
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'block', minWidth: '250px', width: '100%', minHeight: '90px' }}
          data-ad-client={client}
          {...(slot ? { 'data-ad-slot': slot } : {})}
          data-ad-format={format}
          data-full-width-responsive={responsive ? 'true' : 'false'}
        />

        {/* Fallback preview indicator for sandbox/preview domains or when ad slot is empty */}
        <div className="text-center py-2.5 px-4 text-xs text-slate-500 dark:text-slate-400 select-none pointer-events-none">
          <p className="font-semibold text-slate-600 dark:text-slate-300">
            Khu vực hiển thị quảng cáo Google AdSense ({client})
          </p>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
            Quảng cáo thực tế sẽ tự động phân phối khi trang web chạy trên tên miền chính thức đã được Google AdSense phê duyệt.
          </p>
        </div>
      </div>
    </div>
  );
}

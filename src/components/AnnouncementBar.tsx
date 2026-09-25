'use client';

import React from 'react';
import { Instagram, Youtube } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AnnouncementBar: React.FC = () => {
  const { settings } = useApp();
  const social = settings.socialLinks || {};

  return (
    <div className="bg-[#FDF0F3] border-b border-[#F4D3DA]/60 text-xs py-2 px-4 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[#6E6266]">
        {/* Left / Center: Announcement Perks */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 font-medium text-center">
          {settings.announcements.map((text, idx) => (
            <React.Fragment key={idx}>
              <span className="flex items-center gap-1.5 hover:text-[#BA4A6E] transition-colors cursor-default">
                {text}
              </span>
              {idx < settings.announcements.length - 1 && (
                <span className="text-[#E2BDC6] hidden sm:inline">|</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Right: Dynamic Social Profiles Configured in Admin */}
        <div className="flex items-center gap-3.5 text-[#6E6266]">
          {social.instagram && (
            <a
              href={social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              title="Follow on Instagram"
              className="hover:text-[#BA4A6E] hover:scale-110 transition-all duration-200"
            >
              <Instagram className="w-3.5 h-3.5" />
            </a>
          )}

          {social.pinterest && (
            <a
              href={social.pinterest}
              target="_blank"
              rel="noopener noreferrer"
              title="Pin on Pinterest"
              className="hover:text-[#BA4A6E] hover:scale-110 transition-all duration-200"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.747-7.25 7.915-7.25 4.197 0 7.458 2.991 7.458 6.993 0 4.173-2.631 7.525-6.283 7.525-1.226 0-2.379-.637-2.774-1.391l-.755 2.876c-.273 1.045-1.012 2.355-1.508 3.155C10.126 23.834 11.047 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
              </svg>
            </a>
          )}

          {social.youtube && (
            <a
              href={social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              title="Watch on YouTube"
              className="hover:text-[#BA4A6E] hover:scale-110 transition-all duration-200"
            >
              <Youtube className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

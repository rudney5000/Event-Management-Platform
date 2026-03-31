// import { useState } from "react";
// import { Mic, Music, ExternalLink, Calendar } from "lucide-react";
// import { useTranslation } from "react-i18next";

// interface Artist {
//   id: string;
//   name: string;
//   role?: string;
//   bio?: string;
//   imageUrl?: string;
//   setTime?: string;
//   socialLinks?: {
//     instagram?: string;
//     twitter?: string;
//     spotify?: string;
//   };
// }

// interface EventLineupProps {
//   artists: string[];
// }

// export function EventLineup({ artists }: EventLineupProps) {
//   const { t } = useTranslation();
//   const [expandedArtist, setExpandedArtist] = useState<string | null>(null);

//   if (!artists || artists.length === 0) {
//     return (
//       <div className="bg-white/5 rounded-2xl p-8 text-center">
//         <Music className="w-12 h-12 text-gray-600 mx-auto mb-3" />
//         <p className="text-gray-400">{t('eventPage.lineupComingSoon', 'Lineup information coming soon')}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-4">
//       <h3 className="text-2xl font-bold mb-6">{t('eventPage.lineup', 'Lineup')}</h3>
      
//       <div className="grid gap-4">
//         {artists.map((artist) => (
//           <div
//             key={artist.id}
//             className="bg-white/5 rounded-2xl overflow-hidden hover:bg-white/10 transition-colors"
//           >
//             <div className="p-4">
//               <div className="flex items-start gap-4">
//                 {artist.imageUrl ? (
//                   <img
//                     src={artist.imageUrl}
//                     alt={artist.name}
//                     className="w-16 h-16 rounded-full object-cover"
//                   />
//                 ) : (
//                   <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#f5c518]/20 to-[#f5c518]/5 flex items-center justify-center">
//                     <Mic className="w-8 h-8 text-[#f5c518]" />
//                   </div>
//                 )}

//                 <div className="flex-1">
//                   <div className="flex items-start justify-between flex-wrap gap-2">
//                     <div>
//                       <h4 className="text-lg font-bold text-white">{artist.name}</h4>
//                       {artist.role && (
//                         <p className="text-sm text-gray-400">{artist.role}</p>
//                       )}
//                     </div>
                    
//                     {artist.setTime && (
//                       <div className="flex items-center gap-1 text-xs text-gray-400 bg-white/10 px-2 py-1 rounded-full">
//                         <Calendar className="w-3 h-3" />
//                         <span>{artist.setTime}</span>
//                       </div>
//                     )}
//                   </div>

//                   {artist.bio && (
//                     <>
//                       <button
//                         onClick={() => setExpandedArtist(
//                           expandedArtist === artist.id ? null : artist.id
//                         )}
//                         className="text-sm text-[#f5c518] hover:text-[#f5c518]/80 mt-2"
//                       >
//                         {expandedArtist === artist.id ? t('common.showLess', 'Show less') : t('common.showMore', 'Show more')}
//                       </button>
                      
//                       {expandedArtist === artist.id && (
//                         <p className="mt-2 text-sm text-gray-300">{artist.bio}</p>
//                       )}
//                     </>
//                   )}

//                   {artist.socialLinks && (
//                     <div className="flex gap-2 mt-3">
//                       {artist.socialLinks.instagram && (
//                         <a
//                           href={artist.socialLinks.instagram}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-gray-400 hover:text-white transition-colors"
//                         >
//                           <ExternalLink className="w-4 h-4" />
//                         </a>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import { Mic, Music } from "lucide-react";
import { useTranslation } from "react-i18next";

interface EventLineupProps {
  artists: string[];
}

export function EventLineup({ artists }: EventLineupProps) {
  const { t } = useTranslation();

  if (!artists || artists.length === 0) {
    return (
      <div className="bg-white/5 rounded-2xl p-8 text-center">
        <Music className="w-12 h-12 text-gray-600 mx-auto mb-3" />
        <p className="text-gray-400">{t('eventPage.lineupComingSoon', 'Speakers information coming soon')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold mb-6">{t('eventPage.speakers', 'Speakers')}</h3>
      
      <div className="grid gap-3">
        {artists.map((speaker, index) => (
          <div
            key={index}
            className="bg-white/5 rounded-2xl p-4 hover:bg-white/10 transition-colors flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#f5c518]/20 to-[#f5c518]/5 flex items-center justify-center flex-shrink-0">
              <Mic className="w-6 h-6 text-[#f5c518]" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white">{speaker}</h4>
              <p className="text-sm text-gray-400">{t('eventPage.speaker', 'Speaker')}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
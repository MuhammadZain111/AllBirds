// "use client";

// import { signOut, useSession } from "next-auth/react";

// export default function ProfileDropdown({ open, setOpen  }) {

//   const { data: session } = useSession();

//   // Only hide when dropdown closed
//   if (!open) return null;

//   return (
//     <div className="absolute right-0 mt-2 w-40 bg-[#1E1830] rounded-xl shadow-lg border border-gray-700 p-2 z-50">

//       {session ? (
//         <button
//           onClick={() => signOut({ callbackUrl: "/sign-in" })}
//           className="w-full text-left px-4 py-2 rounded-lg text-white hover:bg-[#352C4D] transition"
//         >
//           Sign Out
//         </button>
//       ) : (
//         <p className="text-gray-400 px-4 py-2">
//           Not Signed In
//         </p>
//       )}

//     </div>
//   );
// }

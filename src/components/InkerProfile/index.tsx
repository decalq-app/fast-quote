"use client";

import ActionButton from "./ActionButton";
import Logo from "./Logo";
import ProfileDetails from "./ProfileDetails";
import WorkGallery from "./WorkGallery";

export default function InkerProfile() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Logo />
      <div className="px-6 mt-8">
        <ProfileDetails />

        <div className="mt-8 space-y-4">
          <ActionButton variant="primary" label="Orçamento rápido" onClick={() => {}} />
          <ActionButton variant="secondary" label="Enviar mensagem" onClick={() => {}} />
        </div>

        <div className="mt-10 border-t border-gray-800"></div>

        <WorkGallery />
      </div>
    </div>
  )
}
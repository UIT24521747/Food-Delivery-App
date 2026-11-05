import type { Metadata } from "next";
import { ProfileForm } from "@/components/profile/ProfileForm";

export const metadata: Metadata = {
  title: "Membre Privé | Maison Storià",
};

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-8 sm:py-16">
      <ProfileForm />
    </div>
  );
}

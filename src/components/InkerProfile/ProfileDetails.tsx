import ProfilePicture from "./ProfilePicture";
import { CheckCircle, MapPin } from "lucide-react";

export default function ProfileDetails() {
  return (
    <div className="flex flex-col items-start">
      <ProfilePicture src="/placeholder.svg?height=96&width=96" alt="Profile picture" />
      <div className="mt-4 flex items-center gap-2">
        <h2 className="text-4xl font-bold">Krauser</h2>
        <CheckCircle className="h-6 w-6 text-white" />
      </div>
      <div className="mt-2 flex items-center text-gray-400">
        <MapPin className="h-5 w-5 mr-2" />
        <span className="text-xl">Centro, Curitiba-PR</span>
      </div>
      <p className="mt-6 text-xl text-gray-300 leading-relaxed">
        Se você está procurando por uma tatuagem autêntica e com estilo, venha visitar meu estúdio e vamos criar
        algo único e especial para você.
      </p>
    </div>
  )
}
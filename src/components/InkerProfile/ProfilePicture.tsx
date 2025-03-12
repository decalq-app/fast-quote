import Image from 'next/image';

interface ProfilePictureProps {
  src: string;
  alt: string;
}

export default function ProfilePicture({ src, alt }: ProfilePictureProps) {
  return (
    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-800">
      <Image
        src={src}
        alt={alt}
        width={96}
        height={96}
        className="object-cover w-full h-full"
      />
    </div>
  )
}
import Image from 'next/image'

export default function WorkGallery () {
  return (
    <div className='mt-4'>
      <div className='flex justify-between items-center mb-3'>
        <h3 className='text-lg font-medium'>Trabalho</h3>
      </div>

      <div className='grid grid-cols-2 gap-2'>
        {[1, 2, 3, 4].map((item, index) => (
          <div
            key={index}
            className={`${
              index === 4 ? 'relative' : ''
            } h-40 rounded-lg overflow-hidden ${index > 4 ? 'hidden' : ''}`}
          >
            <Image
              src={`https://picsum.photos/160/160`}
              alt={`Tattoo work ${item}`}
              width={160}
              height={160}
              className='object-cover w-full h-full'
            />
          </div>
        ))}
      </div>
    </div>
  )
}

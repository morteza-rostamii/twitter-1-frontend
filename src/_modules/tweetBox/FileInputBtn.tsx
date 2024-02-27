import { IconButton, Tooltip } from "@chakra-ui/react"

const FileInputBtn = ({
  item,
  handSetImage,
  imageInputRef,
}:any) => {
  const Icon = <div className='w-4 fill-sky-500'>{item.icon}</div>
  
  return (
    <>
      <Tooltip 
      bg={'gray'}
      label={item.name}>
        <IconButton
        aria-label=''
        icon={Icon}
        isRound={true}
        size={'xs'}
        colorScheme='twitter'
        variant={'ghost'}

        onClick={() => imageInputRef.current.click()}
        />
      </Tooltip>
      <input 
      className="hidden"
      id="image" 
      type="file" 
      name="image" 

      onChange={handSetImage}
      ref={imageInputRef}
      />
    </>
  )
}

export default FileInputBtn
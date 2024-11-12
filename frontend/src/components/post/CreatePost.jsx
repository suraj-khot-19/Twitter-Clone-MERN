import { CiImageOn } from "react-icons/ci";
import { BsEmojiSmileFill } from "react-icons/bs";
import userimg from '../../assets/userimg.png'

function CreatePost() {
	return (
		<div className="hidden md:block">
			<div className='flex p-4 items-start gap-4 border-b border-gray-700'>
				<div className='avatar'>
					<div className='w-8 rounded-full'>
						<img src={userimg} />
					</div>
				</div>
				<form className='flex flex-col gap-2 w-full'>
					<textarea
						className='textarea w-full p-0 text-lg resize-none border-none focus:outline-none  border-gray-800'
						placeholder='What is happening?!'
					/>
					{/* todo */}
					{/* <div className='relative w-72 mx-auto'>
						<IoCloseSharp
							className='absolute top-0 right-0 text-white bg-gray-800 rounded-full w-5 h-5 cursor-pointer'
						/>
						<img  src='' className='w-full mx-auto h-72 object-contain rounded' />
					</div> */}

					<div className='flex justify-between border-t py-2 border-t-gray-700'>
						<div className='flex gap-1 items-center'>
							<CiImageOn
								className='fill-primary w-6 h-6 cursor-pointer'
							/>
							<BsEmojiSmileFill className='fill-primary w-5 h-5 cursor-pointer' />
						</div>
						<input type='file' accept='image/*' hidden />
						<button className='btn btn-primary rounded-full text-white font-bold px-8 py-1'>
							Post
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default CreatePost
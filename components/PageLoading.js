import LogoIcon from 'assets/logo-icon.svg'
import LoadingIcon from 'components/LoadingIcon'

export default function PageLoading() {
  return (
    <div className="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50">
      <div className="text-primary opacity-75 top-1/2 my-0 mx-auto block relative w-24 h-24">
        <div className="flex justify-center relative">
          <LogoIcon width={50} height={50} className="absolute mx-auto mt-6 top-1/2" />
        </div>
        <LoadingIcon />
        <p className="text-sm text-center text-black my-2">Loading page<br />Please wait</p>
      </div>
    </div>
  )
}
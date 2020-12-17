import cs from 'classnames'
import GithubIcon from 'assets/github-icon.svg'
import TwitterIcon from 'assets/twitter-icon.svg'

export default function Footer({ isHome }) {
  return (
    <footer className="relative mt-auto">
      <div className={cs("flex justify-between items-center px-6 py-2 md:space-x-10", { 'mt-10 border-t': !isHome }, isHome ? 'bg-primary text-white' : 'bg-gray-50')}>
        {/* <div className="bg-silver mt-auto">
        <div className="max-w-6xl m-auto text-gray-800 flex flex-wrap justify-center">
          <div className="p-5 w-48 ">
            <div className="text-xs uppercase text-gray-500 font-medium">Home</div>
            <a className="my-3 block" href="/#">Services <span className="text-teal-600 text-xs p-1"></span></a><a className="my-3 block" href="/#">Products <span className="text-teal-600 text-xs p-1"></span></a><a className="my-3 block" href="/#">About Us <span className="text-teal-600 text-xs p-1"></span></a><a className="my-3 block" href="/#">Pricing <span className="text-teal-600 text-xs p-1"></span></a><a className="my-3 block" href="/#">Partners <span className="text-teal-600 text-xs p-1">New</span></a>
          </div>
          <div className="p-5 w-48 ">
            <div className="text-xs uppercase text-gray-500 font-medium">User</div>
            <a className="my-3 block" href="/#">Sign in <span className="text-teal-600 text-xs p-1"></span></a><a className="my-3 block" href="/#">New Account <span className="text-teal-600 text-xs p-1"></span></a><a className="my-3 block" href="/#">Demo <span className="text-teal-600 text-xs p-1">New</span></a><a className="my-3 block" href="/#">Career <span className="text-teal-600 text-xs p-1">We're hiring</span></a><a className="my-3 block" href="/#">Surveys <span className="text-teal-600 text-xs p-1">New</span></a>
          </div>
          <div className="p-5 w-48 ">
            <div className="text-xs uppercase text-gray-500 font-medium">Resources</div>
            <a className="my-3 block" href="/#">Documentation <span className="text-teal-600 text-xs p-1"></span></a><a className="my-3 block" href="/#">Tutorials <span className="text-teal-600 text-xs p-1"></span></a><a className="my-3 block" href="/#">Support <span className="text-teal-600 text-xs p-1">New</span></a>
          </div>
          <div className="p-5 w-48 ">
            <div className="text-xs uppercase text-gray-500 font-medium">Product</div>
            <a className="my-3 block" href="/#">Our Products <span className="text-teal-600 text-xs p-1"></span></a><a className="my-3 block" href="/#">Great Deals <span className="text-teal-600 text-xs p-1">New</span></a><a className="my-3 block" href="/#">Analytics <span className="text-teal-600 text-xs p-1"></span></a><a className="my-3 block" href="/#">Mobile <span className="text-teal-600 text-xs p-1"></span></a>
          </div>
          <div className="p-5 w-48 ">
            <div className="text-xs uppercase text-gray-500 font-medium">Support</div>
            <a className="my-3 block" href="/#">Help Center <span className="text-teal-600 text-xs p-1"></span></a><a className="my-3 block" href="/#">Privacy Policy <span className="text-teal-600 text-xs p-1"></span></a><a className="my-3 block" href="/#">Conditions <span className="text-teal-600 text-xs p-1"></span></a>
          </div>
          <div className="p-5 w-48 ">
            <div className="text-xs uppercase text-gray-500 font-medium">Contact us</div>
            <a className="my-3 block" href="/#">XXX XXXX, Floor 4 San Francisco, CA <span className="text-teal-600 text-xs p-1"></span></a><a className="my-3 block" href="/#">contact@company.com <span className="text-teal-600 text-xs p-1"></span></a>
          </div>
        </div>
      </div> */}
        <div className="flex flex-1 flex-col flex-col-reverse items-center max-w-6xl mx-auto  text-sm md:flex-row md:p-5">
          <div className="mt-2">© Copyright {new Date().getFullYear()}. All Rights Reserved.</div>
          <div className="md:flex-auto md:flex-row-reverse mt-2 flex-row flex">
            <a href="https://github.com/rsneh/liqras" target="_blank" rel="noopener noreferrer" className="w-6 mx-1" title="GitHub">
              <GithubIcon className={cs("fill-current cursor-pointer", isHome ? 'text-white hover:opacity-80' : 'text-gray-400 hover:text-gray-500')} />
            </a>
            <a href="https://twitter.com/ronsneh" target="_blank" rel="noopener noreferrer" className="w-6 mx-1" title="Twitter">
              <TwitterIcon className={cs("fill-current cursor-pointer", isHome ? 'text-white hover:opacity-80' : 'text-gray-400 hover:text-gray-500')} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
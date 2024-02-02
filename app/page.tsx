
import Link from 'next/link'
import SignInOutContainer from './Components/User/Authform/page';
export default function Home() {
  return (
    <>
    <SignInOutContainer/>

{/* <div className="flex justify-center items-center h-screen">
  <div className="text-center">
    <Link
      href="/Components/User/SignUp"
      className="text-3xl text-blue-500 hover:underline"
    >
      Sign Up
    </Link>
    <p className="mt-4">
      <Link
        href="/Components/User/Login"
        className="text-gray-600 hover:text-blue-500"
      >
        Login User
      </Link>
    </p>
  </div>
</div> */}

    </>
  )
}

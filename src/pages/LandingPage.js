import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div className="bg-cyan-500 h-[100vh] w-full absolute">
      <div className="space-y-6 container mx-auto mt-40 text-center pt-12 pb-20 bg-cyan-600 w-4/5 ">
        <h2 className="font-bold text-2xl text-pink-600">Memory</h2>
        <p className="text-pink-700 text-medium">Flip over tiles looking for pairs</p>
        <Link to="/Home"><button className="py-2 px-8 rounded-full bg-pink-600 font-medium text-pink-200 ">Play</button></Link>
      </div>
    </div>
  )
}

export default LandingPage;

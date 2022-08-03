import { supabase } from '../utils/supabaseClient'
import checkAuthUser from '../components/protected'
function BuyWebsite({user}) {
    return (
      <div className="container" style={{ padding: '50px 0 100px 0' }}>
        <h1>HELOOOOOOOOO</h1>
      </div>
    )
}

export async function getServerSideProps(req) {
  return checkAuthUser(req)
}


export default BuyWebsite
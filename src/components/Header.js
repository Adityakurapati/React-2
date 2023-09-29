import { FaLaptop, FaTabletAlt, FaMobileAlt } from 'react-icons/fa';
import useWindowSize from '../hooks/useWindowSize';
const Header=( { title } ) =>
{

        const { width }=useWindowSize();
        return (
                <header>
                        <span>{ title }</span>
                        { width<768? <FaMobileAlt />
                                :width<992? <FaTabletAlt />
                                        :<FaLaptop /> }
                </header>
        )
}

export default Header
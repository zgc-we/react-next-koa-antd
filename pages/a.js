import Comp from '../components/comp';
import {withRouter} from 'next/router';

const A = ({router}) => {
    console.log(router, '----router--')
    return (
        <Comp>这是Id={router.query.id}</Comp>
    )
}

export default withRouter(A);
import Comp from '../components/comp';
import {withRouter} from 'next/router';

const A = ({router, name}) => {
    console.log(router, '----router--')
    return (
        <div>
            <Comp>这是Id={router.query.id}</Comp>
            <div>name:{name}</div>
        </div> 
    )
}

A.getInitialProps = async () => {// 初始化数据，但是只有pages下的js会有此方法
    // next此处的代码会直接渲染,而不是等js加载完(重点)
    console.log('----------------')
    // 异步加载 
    const promise = new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                name: 'jokcy'
            })
        },1000)
    });
    return await promise;
}

export default withRouter(A);
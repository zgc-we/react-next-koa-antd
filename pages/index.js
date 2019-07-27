
import {Button} from 'antd';
import Link from 'next/link';
import Router from 'next/router';


export default () => (
    <div>
        <Link href="/a?id=1" >
            <Button>To A</Button>
        </Link>
        <Button onClick={() => {
            Router.push({
                pathname: "/test/b",
                query: {
                    id: 2
                }
            })
        }}>To B</Button> 
    </div>
)
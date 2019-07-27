import App, {Container} from 'next/app';
import "antd/dist/antd.css";

class MyApp extends App {
    // constructor(props){
    //     super(props);
    //     this.state={
    //         count: 1,
    //     }
    // }
    static async getInitialProps(ctx) {// 全局初始化
        let {Component} = ctx
        let pageProps = {};
        if (Component.getInitialProps) {
            console.log(ctx, '----ctx---')
            pageProps = await Component.getInitialProps();
        }
        return {
            pageProps,
        }
    }  

    render() {
        const {Component, pageProps} = this.props; // app 中自带this.props属性
        // console.log(this.props, '--this.props--')
        return (
            <Container>
                <Component {...pageProps}/>
            </Container>
        )
    }
}

export default MyApp;
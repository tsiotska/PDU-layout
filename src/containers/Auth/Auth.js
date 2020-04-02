import './Auth.less';
import logo from '../../assets/logo.png';
import { Input, Button } from '../../patterns';

export default function Auth(props) {
	return (<div className="AuthWrapper">
		<form className="loginForm">

			<div className="column">
				<div className="logoContainer">
					<img src={logo} className="logo" />
				</div>

				<div className="fields">
					<p className="title">Login Now</p>
					<Input placeholder={'User Name'} type={'text'} />
					<Input placeholder={'Password'} type={'password'} />
					<Button type={"submit"} value={"Login"}/>
				</div>
			</div>
		</form>
	</div>);
}

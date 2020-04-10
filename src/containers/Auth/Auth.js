import { Input, Button } from '../../patterns';

export default function Auth(props) {
	return (<div className="AuthWrapper">
		<form className="loginForm">

			<div className="column">
				<div className="logoContainer">
					<img src="../../assets/logo.png" className="logo" />
				</div>

				<div className="fields">
					<p className="title">Login Now</p>
					<Input class={'authInput long'} placeholder={'User Name'} type={'text'} />
					<Input class={'authInput long'} placeholder={'Password'} type={'password'} />
					<Button class={'button'} type={'submit'} value={'Login'} />
				</div>
			</div>
		</form>
	</div>);
}

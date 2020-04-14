import {Button, RadioButton} from "../../patterns";

const Languages = ({languages}) => (
	<div className="langWrapper">

		<div className="row head">
			<div className="title">
				Languages
			</div>
		</div>

		<div className="column container">
			<div className="column radioContainer">
				{languages.map((lang) => (<div className="row">
						<RadioButton label={lang} name="language"/>
					</div>
				))}
			</div>

			<div className="row buttonContainer">
				<Button class="small disabled" type="button" value="Save Changes"/>
			</div>
		</div>

	</div>
);

export default Languages;

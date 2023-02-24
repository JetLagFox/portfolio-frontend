import PropTypes from 'prop-types';

import { useState } from 'react';

const ExperienceItem = ({job, city, country, startDate, finishDate, description, company, tags}) => {

	const [descriptionOpened, setDescriptionOpened] = useState(false);

	return (
		<li className='experience-item'>
			<h3 onClick={() => setDescriptionOpened(!descriptionOpened)}>{job}. <span>{city}. {country}</span></h3>
			{descriptionOpened && 
				<div>
					<p>{description}</p>
					<div className='experience-item__tags'>{tags.split(";").map((item, index) => {
						return <span key={index}>#{item}</span>
					})}</div>
				</div>
			}
		</li>
	)
}

export default ExperienceItem;

ExperienceItem.propTypes = {
	job: PropTypes.string,
	city: PropTypes.string,
	country: PropTypes.string,
	startDate: PropTypes.instanceOf(Date),
	finishDate: PropTypes.instanceOf(Date),
	description: PropTypes.string,
	company: PropTypes.string,
	tags: PropTypes.string
}
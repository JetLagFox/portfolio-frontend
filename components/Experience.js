import { useEffect, useState } from 'react';
import { getExperiences } from '../api/experience';

import ExperienceItem from './../atoms/ExperienceItem';
import TagItem from '../atoms/TagItem';

const Experience = ({data}) => {

	const [filterBy, setFilterBy] = useState([]);
	const [tagsArray, setTagsArray] = useState([]);
	const [experiences, setExperiences] = useState();

	useEffect(() => {
		const customArray = [];
		
		data?.experiences.map((item) => {
			item.tags.split(";").map((tag) => {
				customArray.indexOf(tag) == -1 && customArray.push(tag)
			})
		})

		setTagsArray(customArray);
		setExperiences(data.experiences);
	}, [data])

	useEffect(() => {
		const allExperiences = experiences;

		if (filterBy?.length > 0) {
			setExperiences(allExperiences.filter(experience => experience.tags.indexOf(filterBy[0]) > -1 ))
		} else {
			setExperiences(data.experiences);
		}
	}, [filterBy])

	const handleSelection = (item) => {
		filterBy?.indexOf(item) > -1
			? setFilterBy(oldArray => oldArray.filter(key => key !== item ))
			: setFilterBy(oldArray => [...oldArray, item]);
	}

	return (
		<section className="experience">
			<div className="wrapper">
				<h2>Experiencia Laboral</h2>
				<p>
					{
						tagsArray.map((item, index) => {
							return <TagItem key={index} tag={item} handleSelection={handleSelection} />
						})
					}
				</p>
				<ul className='experience__wrap'>
					{ 
						experiences?.map((item, index) => {
							return <ExperienceItem 
								job={item.job}
								city={item.city}
								country={item.country}
								startDate={item.startDate}
								finishDate={item.finishDate}
								description={item.description}
								company={item.company}
								key={index}
								tags={item.tags}
							/>
						})
					}
				</ul>
			</div>	
		</section>
			
	)
}

export default Experience;
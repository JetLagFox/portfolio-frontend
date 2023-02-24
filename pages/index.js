import { getExperiences } from '../api/experience';
import Experience from '../components/Experience';
import Header from '../compositions/Header';
import Hero from '../compositions/Hero';

/*
const myExperience = [
	{
		job: "Desarrollador de front-end",
		city: "Bilbao",
		country: "España",
		startDate: "",
		finishDate: "",
		description: "Primera descripción",
		company: "LIN3S",
		tags: "React JS;HTML 5;CSS3;Javascript;jQuery;Mailchimp"
	},
	{
		job: "Email Marketing",
		city: "Bilbao",
		country: "España",
		startDate: "",
		finishDate: "",
		description: "Segunda descripción",
		company: "LIN3S",
		tags: "HubSpot;Stripo;Litmus;Doppler;Mailchimp"
	}
] */

const Index = ({data}) => {

	return (
		<>
			<Header />
			<Hero />
			{data && <Experience data={data} />}
		</>
	)                
} 

export default Index;

Index.getInitialProps = async () => {
	const experiences = await getExperiences();
	console.log("adsfsdfasdfsdafs");
	return { data: experiences}
}
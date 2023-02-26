import { getExperiences } from '../api/experience';


import Experience from '../components/Experience';
import ContactForm from '../components/ContactForm';
import Header from '../compositions/Header';
import Hero from '../compositions/Hero';

const Index = ({data}) => {

	return (
		<>
			<Header />
			<Hero />
			{data && <Experience data={data} />}
			<ContactForm />
		</>
	)                
} 

export default Index;

Index.getInitialProps = async () => {
	const experiences = await getExperiences();
	return { data: experiences }
}
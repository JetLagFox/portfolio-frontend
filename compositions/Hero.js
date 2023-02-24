import Link from "../atoms/Link";

const Hero = () => {
    return (
        <section className='hero'>
            <div className="hero__background">
                <span className="rectangle rectangle-1"></span>
                <span className="rectangle rectangle-2"></span>
                <span className="rectangle rectangle-3"></span>
                <span className="rectangle rectangle-4"></span>
            </div>
            <div className="wrapper">
                <div className="hero__content">
                    <h1>Egoi Cantero Viqueira</h1>
                    <p className="hero__content-descripcion">Diplomado en Ingeniería Técnica. Desarrollador Front-end. Técnico de Marketing</p>
                    <Link linkText="Conóceme" linkUrl="#experience" linkType="primary" />
                </div>
            </div>
        </section>
    )
}

export default Hero;
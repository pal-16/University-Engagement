import styles from './Hero.module.scss';
// import Home1 from '../../../assets/home-1.webp';
// import Home2 from '../../../assets/home-2.webp';
// import Home3 from '../../../assets/home-3.webp';

const Hero = ({

}) => {
    return (
        <>
            {
                <div className={styles.is} id='is'>
                    <div
                        style={{
                            backgroundImage: `linear-gradient(#00000081, #00000081),
                            url("https://media.istockphoto.com/photos/gold-cup-winner-picture-id627253912?b=1&k=20&m=627253912&s=170667a&w=0&h=sMW8hF2L7bTYqCWP42LCKbn0ZWL5pYD7OCsd6wXqYPk=")`,

                        }}
                        className={styles.caption}
                    >
                        <div className={styles.captionHead}>Get Recognized</div>
                        <div className={styles.captionSub}>
                            Showcase your acheivements and get rewarded college coins!
                        </div>
                    </div>
                    <div
                        style={{
                            backgroundImage: `linear-gradient(#00000098, #00000098),
                            url("https://constructionexec.com/assets/site_18/images/article/101321115327.jpg?width=1280")`,

                        }}
                        className={styles.caption}
                    >
                        <div className={styles.captionHead}>Showcase</div>
                        <div className={styles.captionSub}>
                            Projects are an integral part of gaining knowledge, showcase your work and also refer to peer's amazing creativity!
                        </div>
                    </div>
                    <div
                        style={{
                            backgroundImage: `linear-gradient(#00000081, #00000081),
		url("https://image.freepik.com/free-photo/hand-putting-mix-coins-seed-clear-bottle-copyspace-business-investment-growth-concept_1423-104.jpg")`,
                        }}
                        className={styles.caption}
                    >
                        <div className={styles.captionHead}>Crowdfunding</div>
                        <div className={styles.captionSub}>
                            Earned coins? Help the college community through your achievements
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default Hero;
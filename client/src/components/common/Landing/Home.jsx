import styles from './Hero.module.scss';

const Hero = ({
    imgName,
    title,
    subtitleList,
    isHome,
    backgroundPosition = 'center',
}) => {
    return (
        <>
            {/* <div
                style={{
                    backgroundImage: `linear-gradient(
                            to bottom,
                            rgba(0, 0, 0, 0.5),
                            rgba(0, 0, 0, 0.5),
                            rgba(0, 0, 0, 0.5)), url("https://thumbs.dreamstime.com/z/community-engagement-concept-community-engagement-concept-colleagues-communicate-each-other-discuss-details-project-226446266.jpg")`,
                    backgroundPosition: backgroundPosition,
                }}
                className={styles.hero}
            >
                <div className={styles.heroHead}>{title}</div> */}
            {/* <div className={styles.heroSub}>
                    {subtitleList.map((heroTag, index) => {
                        return subtitleList.length !== index + 1 ? (
                            <span key={`hero_${index}`}>
                                {heroTag}&nbsp;&nbsp;&bull;&nbsp;&nbsp;
                            </span>
                        ) : (
                            <span key={`hero_${index}`}>{heroTag}</span>
                        );
                    })}
                </div> */}
            {/* <a href='#is'>
                    <div className={styles.scrollIndicator}></div>
                </a>
                {isHome && (
                    <a href='#notifs' className={styles.notif}>

                    </a>
                )}
            </div> */}
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
		url("https://images.edexlive.com/uploads/user/imagelibrary/2021/6/11/original/crowdfunding-3158320_1280.png")`,
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
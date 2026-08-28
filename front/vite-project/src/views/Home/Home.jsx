import styles from "../Home/Home.module.css";

const Home = () => {
    return (
      <>
        <div className={styles.homeContainer}>
          <h1>Fix It Reparacion De Computadoras</h1>
        </div>
        <div>
          <h2>
            Horarios
            <br/>
            10 a 18 hs
          </h2>
        </div>
      </>
    )
}

export default Home;
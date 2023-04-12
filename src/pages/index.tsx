import Navbar from '@/components/navbar';
import styles from '@/styles/Home.module.css'
import Link from 'next/link';

const Home = () => {
  return (
    <>
      <div className='all'>

        <Navbar />
        <div className={styles.container}>
          <header className={styles.header}>
            <h1 className={styles.title}>Welcome to MatrixHub</h1>
            <p className={styles.subtitle}>A community-driven platform for discussing all things Matrix</p>
          </header>
          <div className={styles.content}>
            <div className="card">
              <h2 className={styles.cardTitle}>Join the Discussion</h2>
              <p className={styles.cardDescription}>Create an account to start posting and commenting on Matrix topics</p>
              <Link href="/auth/signup">
                <button className={styles.cardButton} >Sign Up</button>
              </Link>
            </div>
            <div className="card">
              <h2 className={styles.cardTitle}>Explore Topics</h2>
              <p className={styles.cardDescription}>Browse popular topics or search for specific keywords</p>
              <Link href="/">
                <button className={styles.cardButton}>Explore</button>
              </Link>
            </div>
            <div className="card">
              <h2 className={styles.cardTitle}>Create Content</h2>
              <p className={styles.cardDescription}>Make new communities with special ideas</p>
              <Link href="/sub/create">
                <button className={styles.cardButton}>Create</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
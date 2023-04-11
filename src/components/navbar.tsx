import Link from 'next/link';
import styles from '../styles/Navbar.module.css';
import { signIn, signOut, useSession } from 'next-auth/react';

const Navbar = () => {
    const { data: session } = useSession();
    const user = session?.user;


    return (
        <nav className={styles.nav}>
            <div className={styles.logo}>
                <Link href="/">
                    MatrixHub
                </Link>
            </div>
            <ul className={styles.menu}>
                <li className={styles.menu_item}>
                    <Link href="/">
                        Home
                    </Link>
                </li>
                <li className={styles.menu_item}>
                    <Link href="/topics">
                        Topics
                    </Link>
                </li>
                <li className={styles.menu_item}>
                    <Link href="/about">
                        About
                    </Link>
                </li>
            </ul>
            {
                
                user ?
                    <button onClick={()=>signOut()}>
                        Sign out
                    </button>
                     :
                <Link href="/auth/signin">
                    <button>
                        Sign in
                    </button>
                </Link>
            }
        </nav>
    );
};

export default Navbar;
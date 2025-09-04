// Header.js

import { NavLink, Link, useLocation } from "react-router-dom"; // NavLink와 Link 모두 import
import styles from "./Header.module.css";
import appIconUrl from "../assets/Icon.png";
import titleIconUrl from "../assets/Icontitle.svg";

function Header() {
  const location = useLocation();

  return (
    <header className={styles.Header}>
      <div className={styles.container}>
        <div className={styles.appIcon}>
          <img src={appIconUrl} alt="App Icon" className={styles.icon} />
          <img src={titleIconUrl} alt="Title Icon" className={styles.icon} />
        </div>

        <nav className={styles.navigator}>
          <NavLink
            to="/policies"
            className={({ isActive }) =>
              isActive
                ? `${styles.navigatorItem} ${styles.activeNavItem}`
                : styles.navigatorItem
            }
          >
            정책보기
          </NavLink>
          <NavLink
            to="/community"
            exact
            className={({ isActive }) =>
              isActive
                ? `${styles.navigatorItem} ${styles.activeNavItem}`
                : styles.navigatorItem
            }
          >
            커뮤니티
          </NavLink>
          <NavLink
            to="/report"
            className={({ isActive }) =>
              isActive
                ? `${styles.navigatorItem} ${styles.activeNavItem}`
                : styles.navigatorItem
            }
          >
            레포트
          </NavLink>
        </nav>

        <div className={styles.user}>
          <Link to="/login" className={styles.navigatorItem}>
            로그인
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;

import Image from "next/image";
import styles from "./page.module.css";
import Calendar from "@/components/Calendar";

export default function Home() {
  return (
    <main className={styles.main}>
      <div>
        <h1>Upcoming Releases</h1>
      </div>
      <Calendar></Calendar>      
    </main>
  );
}

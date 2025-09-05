import styles from "./dashboard.module.css";

export default function Dashboard() {
  return (

   <>
       <div className={styles.heroSection}>
      <div className={styles.textContainer}>
        <h2 className={styles.title}>Welcome Upskilling</h2>
        <h3 className={styles.subtitle}>
          You can add project and assign tasks to your team
        </h3>
      </div>
    </div>
   <div className="container mt-4">
      
      <div className="row g-4">
        {/* Card 1 */}
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Card Title 1</h5>
              <p className="card-text">
                This is a short paragraph inside the first card. You can put any content here.
              </p>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Card Title 2</h5>
              <p className="card-text">
                This is a short paragraph inside the second card. You can put any content here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div></>
    
  );
}

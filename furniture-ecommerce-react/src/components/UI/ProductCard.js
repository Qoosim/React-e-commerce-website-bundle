import React from 'react';
import { Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import productImg from '../../assets/images/arm-chair-01.jpg';
import styles from './product.module.css';
import { motion } from 'framer-motion';


const ProductCard = () => {
  return (
    <Col lg='3' md='4'>
      <article className={styles.productItem}>
        <div className={styles.productImage}>
          <motion.img whileHover={{ scale: 0.9 }} src={productImg} alt="Product" />
        </div>
        <div className={`${styles.itemTitle} ${styles.productInfo}`}>
          <h3 className={styles.productName}>
            <Link to='/shop/id'>Modern Armchair</Link>
          </h3>
          <span>Chair</span>
        </div>
        <div className={styles.productCardBtn}>
          <span className={styles.price}>$299</span>
          <motion.span whileTap={{ scale: 1.3 }}>
            <i class="ri-add-line"></i>
          </motion.span>
        </div>
      </article>
    </Col>
  )
}

export default ProductCard;

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { JewelFrame } from "./JewelFrame";

export const formatINR = (n) => "₹" + n.toLocaleString("en-IN");

export const ProductCard = ({ product, index = 0 }) => (
  <motion.article
    data-testid={`product-card-${product.id}`}
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
    className="group cursor-pointer"
  >
    <Link to={`/product/${product.id}`} data-testid={`product-link-${product.id}`} className="block">
      <JewelFrame
        image={product.images && product.images[0]}
        label={product.category}
        aspect="aspect-[4/5]"
        testId={`product-image-${product.id}`}
        className="transition-shadow duration-500 group-hover:shadow-[0_18px_50px_-12px_rgba(150,62,53,0.28)]"
      />
      <div className="mt-5 text-center">
        <h3 data-testid={`product-name-${product.id}`} className="font-serif text-lg text-charcoal transition-colors duration-300 group-hover:text-maroon">
          {product.name}
        </h3>
        <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-clay">{product.purity}</p>
      </div>
    </Link>
  </motion.article>
);
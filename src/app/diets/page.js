import Link from 'next/link';
import React from 'react';

export default function dietaryGuides() {
  return (
    <div
      className="diets-div"
      style={{
        padding: '30px',
        maxWidth: '900px',
        margin: '10vh auto',
      }}
    >
      <h1>Dietary Guides</h1>
      <p>
        The following guides are presented as useful references. You should <strong>ALWAYS</strong> consult with your doctor when considering significant dietary changes. While these diets have been shown to imrpvoed symptoms for many people, these diets aren&apos;t for everyone. Remember to do what feels right for you and best for your body.
      </p>
      <div style={{ display: 'flex', gap: '15px', minHeight: '55px' }}>
        <Link passHref href="/diets/autoimmune">
          <button type="submit" className="button">
            Autoimmune Protocol Diet
          </button>
        </Link>
        <Link passHref href="/diets/fodmap">
          <button type="submit" className="button">
            FODMAP Diet
          </button>
        </Link>
      </div>
    </div>
  );
}

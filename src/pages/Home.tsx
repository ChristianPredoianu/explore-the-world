import { useState, useEffect } from 'react';
/* import useFetch from '@/hooks/useFetch' */
import MainNav from '@/components/nav/MainNav';
import SlidesAutoSwiper from '@/components/swiper/SlidesAutoSwiper';
import classNames from 'classnames';
import classes from '@/pages/Home.module.scss';

export default function Home() {
  return (
    <>
      <MainNav />
      <main className={classes.main}>
        <div className={classes.overlay}></div>
        <div className={classNames('container', classes.heroContent)}>
          <section className={classNames(classes.heroSectionHeadings)}>
            <p className={classes.heroParagraph}>Travel website</p>
            <h1 className={classes.heroPrimaryHeading}>
              Never stop exploring the world.
            </h1>
            <h2 className={classes.heroSecondaryHeading}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </h2>
          </section>
          <section className={classes.sectionSwiper}>
            <SlidesAutoSwiper />
          </section>
        </div>
      </main>
    </>
  );
}

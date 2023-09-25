import React from 'react';
import Link from 'next/link';
import StudentInfo from './StudentInfo/page';

export default function Home() {
  return (
    <main>
      <h1>CPRG 306: Web Development 2 - Assignments</h1>
      <StudentInfo/>
      <p><Link href="/week2">week2</Link></p>
      <p><Link href="/week3">week3</Link></p>
      <p><Link href="/week4">week4</Link></p>
    </main>
  );
}
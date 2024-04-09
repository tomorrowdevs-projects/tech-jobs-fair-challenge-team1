'use client'
// import node module libraries
import { Container } from 'react-bootstrap';
import {useContext, useEffect} from "react";
import {useRouter} from "next/navigation";
import {AuthContext} from "../../../context/AuthContext";

export default function AuthLayout({ children }) {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.replace('/contacts');
    }
  }, [user, router]);
  return (
    <Container className="d-flex flex-column">  
        {children}
    </Container>
  )
}

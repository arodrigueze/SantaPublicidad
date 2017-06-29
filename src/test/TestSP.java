package test;

import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import logic.MD5Encryption;
import logic.TextValidation;

public class TestSP {

	@BeforeClass
	public static void setUpBeforeClass() throws Exception {
	}

	@Before
	public void setUp() throws Exception {
	}

	@Test
	public void testTextValidation() {
		assertEquals("bogota", TextValidation.cambiarTildes("Bogotá"));
	}
	
	@Test
	public void testPasswordpara1234() {
		assertEquals("81dc9bdb52d04dc20036dbd8313ed055",MD5Encryption.getMD5("1234") );
	}
	
	@Test
	public void testPasswordparaAbcd() {
		assertEquals("08e4fd9c30d6a2c12865399588d79091",MD5Encryption.getMD5("AbcD@1234:") );
	}
}

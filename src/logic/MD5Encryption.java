package logic;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class MD5Encryption {
	public static String getMD5(String input) {
        try {
            String hashtext = new BigInteger(1, MessageDigest.getInstance("MD5").digest(input.getBytes())).toString(16);
            while (hashtext.length() < 32) {
                hashtext = "0" + hashtext;
            }
            return hashtext;
        }catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }
}

package jio;

import java.io.IOException;
import java.io.InputStream;

/** java.io.DataInputStream without checked exceptions (bytecode never declared them). */
public class DataInputStream {
    private final java.io.DataInputStream in;

    public DataInputStream(InputStream in) {
        this.in = new java.io.DataInputStream(in);
    }

    private static IOFailure fail(IOException e) {
        return new IOFailure(e);
    }

    public void close() {
        try {
            in.close();
        } catch (IOException e) {
            throw fail(e);
        }
    }

    public int read() {
        try {
            return in.read();
        } catch (IOException e) {
            throw fail(e);
        }
    }

    public int read(byte[] b) {
        try {
            return in.read(b);
        } catch (IOException e) {
            throw fail(e);
        }
    }

    public int read(byte[] b, int off, int len) {
        try {
            return in.read(b, off, len);
        } catch (IOException e) {
            throw fail(e);
        }
    }

    public boolean readBoolean() {
        try {
            return in.readBoolean();
        } catch (IOException e) {
            throw fail(e);
        }
    }

    public byte readByte() {
        try {
            return in.readByte();
        } catch (IOException e) {
            throw fail(e);
        }
    }

    public int readUnsignedByte() {
        try {
            return in.readUnsignedByte();
        } catch (IOException e) {
            throw fail(e);
        }
    }

    public short readShort() {
        try {
            return in.readShort();
        } catch (IOException e) {
            throw fail(e);
        }
    }

    public int readInt() {
        try {
            return in.readInt();
        } catch (IOException e) {
            throw fail(e);
        }
    }

    public String readUTF() {
        try {
            return in.readUTF();
        } catch (IOException e) {
            throw fail(e);
        }
    }

    public long skip(long n) {
        try {
            return in.skip(n);
        } catch (IOException e) {
            throw fail(e);
        }
    }
}

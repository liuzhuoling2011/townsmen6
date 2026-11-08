package jio;

import java.io.IOException;
import java.io.OutputStream;

/** java.io.DataOutputStream without checked exceptions (bytecode never declared them). */
public class DataOutputStream {
    private final java.io.DataOutputStream out;

    public DataOutputStream(OutputStream out) {
        this.out = new java.io.DataOutputStream(out);
    }

    public void write(int b) {
        try {
            out.write(b);
        } catch (IOException e) {
            throw new IOFailure(e);
        }
    }

    public void write(byte[] b) {
        write(b, 0, b.length);
    }

    public void write(byte[] b, int off, int len) {
        try {
            out.write(b, off, len);
        } catch (IOException e) {
            throw new IOFailure(e);
        }
    }

    public void writeBoolean(boolean v) {
        try {
            out.writeBoolean(v);
        } catch (IOException e) {
            throw new IOFailure(e);
        }
    }

    public void writeByte(int v) {
        try {
            out.writeByte(v);
        } catch (IOException e) {
            throw new IOFailure(e);
        }
    }

    public void writeShort(int v) {
        try {
            out.writeShort(v);
        } catch (IOException e) {
            throw new IOFailure(e);
        }
    }

    public void writeInt(int v) {
        try {
            out.writeInt(v);
        } catch (IOException e) {
            throw new IOFailure(e);
        }
    }
}

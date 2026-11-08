package javax.microedition.lcdui;

import harness.Host;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import javax.imageio.ImageIO;

public class Image {
    final BufferedImage pixels;
    final boolean mutable;
    public final int id;

    private Image(BufferedImage pixels, boolean mutable) {
        this.pixels = pixels;
        this.mutable = mutable;
        this.id = Host.nextImageId++;
    }

    public static Image createImage(int w, int h) {
        BufferedImage img = new BufferedImage(w, h, BufferedImage.TYPE_INT_ARGB);
        for (int y = 0; y < h; y++) {
            for (int x = 0; x < w; x++) {
                img.setRGB(x, y, 0xFFFFFFFF);
            }
        }
        Image result = new Image(img, true);
        Host.log("createImage#" + result.id + " " + w + "x" + h);
        return result;
    }

    public static Image createImage(String name) throws IOException {
        InputStream in = Host.resource(name);
        if (in == null) {
            throw new IOException(name);
        }
        Image result = new Image(decode(in.readAllBytes()), false);
        Host.log("createImage#" + result.id + " " + name);
        return result;
    }

    public static Image createImage(byte[] data, int offset, int length) {
        byte[] copy = new byte[length];
        System.arraycopy(data, offset, copy, 0, length);
        Image result = new Image(decode(copy), false);
        Host.log("createImage#" + result.id + " bytes " + length + " " + Host.crc(copy));
        return result;
    }

    private static BufferedImage decode(byte[] bytes) {
        try {
            BufferedImage src = ImageIO.read(new ByteArrayInputStream(bytes));
            if (src == null) {
                throw new IllegalArgumentException("undecodable image");
            }
            BufferedImage argb = new BufferedImage(src.getWidth(), src.getHeight(), BufferedImage.TYPE_INT_ARGB);
            for (int y = 0; y < src.getHeight(); y++) {
                for (int x = 0; x < src.getWidth(); x++) {
                    argb.setRGB(x, y, src.getRGB(x, y));
                }
            }
            return argb;
        } catch (IOException e) {
            throw new IllegalArgumentException(e);
        }
    }

    public Graphics getGraphics() {
        if (!mutable) {
            throw new IllegalStateException("immutable");
        }
        return new Graphics(pixels, "img#" + id);
    }

    public int getWidth() {
        return pixels.getWidth();
    }

    public int getHeight() {
        return pixels.getHeight();
    }

    public boolean isMutable() {
        return mutable;
    }

    public void getRGB(int[] rgb, int offset, int scanlength, int x, int y, int w, int h) {
        for (int row = 0; row < h; row++) {
            for (int col = 0; col < w; col++) {
                rgb[offset + row * scanlength + col] = pixels.getRGB(x + col, y + row);
            }
        }
    }
}

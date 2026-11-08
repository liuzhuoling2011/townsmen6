package javax.microedition.lcdui;

/**
 * Deterministic box-glyph font used by the reference harness. The web port's
 * test mode implements exactly the same metrics and glyph boxes.
 */
public final class Font {
    public static final int FACE_SYSTEM = 0;
    public static final int FACE_MONOSPACE = 32;
    public static final int FACE_PROPORTIONAL = 64;
    public static final int STYLE_PLAIN = 0;
    public static final int STYLE_BOLD = 1;
    public static final int STYLE_ITALIC = 2;
    public static final int STYLE_UNDERLINED = 4;
    public static final int SIZE_SMALL = 8;
    public static final int SIZE_MEDIUM = 0;
    public static final int SIZE_LARGE = 16;

    private static final Font DEFAULT = new Font(0, 0, 0);

    final int face;
    final int style;
    final int size;

    private Font(int face, int style, int size) {
        this.face = face;
        this.style = style;
        this.size = size;
    }

    public static Font getDefaultFont() {
        return DEFAULT;
    }

    public static Font getFont(int face, int style, int size) {
        return new Font(face, style, size);
    }

    public int getHeight() {
        return size == SIZE_SMALL ? 12 : size == SIZE_LARGE ? 16 : 14;
    }

    public int charWidth(char c) {
        int base = size == SIZE_SMALL ? 5 : size == SIZE_LARGE ? 7 : 6;
        if ((style & STYLE_BOLD) != 0) {
            base++;
        }
        if (c == ' ') {
            return base - 2;
        }
        if (c == 'i' || c == 'l' || c == '.' || c == ',' || c == '!' || c == '\'' || c == ':') {
            return base - 3;
        }
        if (c == 'm' || c == 'w' || c == 'M' || c == 'W') {
            return base + 2;
        }
        return base;
    }

    public int stringWidth(String s) {
        int w = 0;
        for (int i = 0; i < s.length(); i++) {
            w += charWidth(s.charAt(i));
        }
        return w;
    }

    public int getBaselinePosition() {
        return getHeight() - 3;
    }

    public int getSize() {
        return size;
    }

    public int getStyle() {
        return style;
    }

    public int getFace() {
        return face;
    }

    public String id() {
        return face + "/" + style + "/" + size;
    }
}

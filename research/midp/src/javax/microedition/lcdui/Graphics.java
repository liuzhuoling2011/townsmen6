package javax.microedition.lcdui;

import harness.Host;
import java.awt.image.BufferedImage;

/**
 * Deterministic software rasterizer with MIDP semantics. The web port's test
 * renderer mirrors these rules so frames can be compared pixel for pixel.
 */
public class Graphics {
    public static final int HCENTER = 1;
    public static final int VCENTER = 2;
    public static final int LEFT = 4;
    public static final int RIGHT = 8;
    public static final int TOP = 16;
    public static final int BOTTOM = 32;
    public static final int BASELINE = 64;
    public static final int SOLID = 0;
    public static final int DOTTED = 1;

    private final BufferedImage target;
    private final String name;
    private int color = 0xFF000000;
    private Font font = Font.getDefaultFont();
    private int clipX;
    private int clipY;
    private int clipW;
    private int clipH;
    private int tx;
    private int ty;

    public Graphics(BufferedImage target, String name) {
        this.target = target;
        this.name = name;
        clipW = target.getWidth();
        clipH = target.getHeight();
    }

    private void log(String op) {
        Host.logDraw(name + " " + op);
    }

    public void setColor(int rgb) {
        color = 0xFF000000 | (rgb & 0xFFFFFF);
    }

    public void setColor(int r, int g, int b) {
        setColor((r << 16) | (g << 8) | b);
    }

    public int getColor() {
        return color & 0xFFFFFF;
    }

    public void setFont(Font f) {
        font = f == null ? Font.getDefaultFont() : f;
    }

    public Font getFont() {
        return font;
    }

    public void translate(int x, int y) {
        tx += x;
        ty += y;
    }

    public int getTranslateX() {
        return tx;
    }

    public int getTranslateY() {
        return ty;
    }

    public void setClip(int x, int y, int w, int h) {
        x += tx;
        y += ty;
        int x2 = Math.min(x + w, target.getWidth());
        int y2 = Math.min(y + h, target.getHeight());
        clipX = Math.max(x, 0);
        clipY = Math.max(y, 0);
        clipW = Math.max(x2 - clipX, 0);
        clipH = Math.max(y2 - clipY, 0);
    }

    public void clipRect(int x, int y, int w, int h) {
        x += tx;
        y += ty;
        int x1 = Math.max(x, clipX);
        int y1 = Math.max(y, clipY);
        int x2 = Math.min(x + w, clipX + clipW);
        int y2 = Math.min(y + h, clipY + clipH);
        clipX = x1;
        clipY = y1;
        clipW = Math.max(x2 - x1, 0);
        clipH = Math.max(y2 - y1, 0);
    }

    public int getClipX() {
        return clipX - tx;
    }

    public int getClipY() {
        return clipY - ty;
    }

    public int getClipWidth() {
        return clipW;
    }

    public int getClipHeight() {
        return clipH;
    }

    private void plot(int x, int y, int argb) {
        if (x < clipX || y < clipY || x >= clipX + clipW || y >= clipY + clipH) {
            return;
        }
        int a = argb >>> 24;
        if (a == 0) {
            return;
        }
        if (a == 255) {
            target.setRGB(x, y, argb);
            return;
        }
        int dst = target.getRGB(x, y);
        int r = (((argb >> 16) & 255) * a + ((dst >> 16) & 255) * (255 - a)) / 255;
        int g = (((argb >> 8) & 255) * a + ((dst >> 8) & 255) * (255 - a)) / 255;
        int b = ((argb & 255) * a + (dst & 255) * (255 - a)) / 255;
        target.setRGB(x, y, 0xFF000000 | (r << 16) | (g << 8) | b);
    }

    public void fillRect(int x, int y, int w, int h) {
        log("fillRect " + x + " " + y + " " + w + " " + h + " " + Integer.toHexString(color));
        x += tx;
        y += ty;
        for (int yy = y; yy < y + h; yy++) {
            for (int xx = x; xx < x + w; xx++) {
                plot(xx, yy, color);
            }
        }
    }

    public void drawRect(int x, int y, int w, int h) {
        log("drawRect " + x + " " + y + " " + w + " " + h + " " + Integer.toHexString(color));
        if (w < 0 || h < 0) {
            return;
        }
        x += tx;
        y += ty;
        for (int xx = x; xx <= x + w; xx++) {
            plot(xx, y, color);
            plot(xx, y + h, color);
        }
        for (int yy = y + 1; yy < y + h; yy++) {
            plot(x, yy, color);
            plot(x + w, yy, color);
        }
    }

    public void drawLine(int x1, int y1, int x2, int y2) {
        log("drawLine " + x1 + " " + y1 + " " + x2 + " " + y2 + " " + Integer.toHexString(color));
        x1 += tx;
        y1 += ty;
        x2 += tx;
        y2 += ty;
        int dx = Math.abs(x2 - x1);
        int dy = -Math.abs(y2 - y1);
        int sx = x1 < x2 ? 1 : -1;
        int sy = y1 < y2 ? 1 : -1;
        int err = dx + dy;
        while (true) {
            plot(x1, y1, color);
            if (x1 == x2 && y1 == y2) {
                break;
            }
            int e2 = 2 * err;
            if (e2 >= dy) {
                err += dy;
                x1 += sx;
            }
            if (e2 <= dx) {
                err += dx;
                y1 += sy;
            }
        }
    }

    public void drawImage(Image img, int x, int y, int anchor) {
        log("drawImage #" + img.id + " " + x + " " + y + " " + anchor);
        drawRegionInternal(img, 0, 0, img.getWidth(), img.getHeight(), 0, x, y, anchor);
    }

    public void drawRegion(Image img, int sx, int sy, int w, int h, int transform, int x, int y, int anchor) {
        log("drawRegion #" + img.id + " " + sx + " " + sy + " " + w + " " + h + " " + transform + " " + x + " " + y + " " + anchor);
        drawRegionInternal(img, sx, sy, w, h, transform, x, y, anchor);
    }

    private void drawRegionInternal(Image img, int sx, int sy, int w, int h, int transform, int x, int y, int anchor) {
        boolean swap = (transform & 4) != 0;
        int dw = swap ? h : w;
        int dh = swap ? w : h;
        x += tx;
        y += ty;
        if ((anchor & HCENTER) != 0) {
            x -= dw / 2;
        } else if ((anchor & RIGHT) != 0) {
            x -= dw;
        }
        if ((anchor & VCENTER) != 0) {
            y -= dh / 2;
        } else if ((anchor & BOTTOM) != 0) {
            y -= dh;
        }
        BufferedImage src = img.pixels;
        for (int dy = 0; dy < dh; dy++) {
            int py = y + dy;
            if (py < clipY || py >= clipY + clipH) {
                continue;
            }
            for (int dx = 0; dx < dw; dx++) {
                int px = x + dx;
                if (px < clipX || px >= clipX + clipW) {
                    continue;
                }
                int u;
                int v;
                switch (transform) {
                    case 0: u = dx; v = dy; break;
                    case 1: u = dx; v = h - 1 - dy; break;
                    case 2: u = w - 1 - dx; v = dy; break;
                    case 3: u = w - 1 - dx; v = h - 1 - dy; break;
                    case 4: u = dy; v = dx; break;
                    case 5: u = dy; v = h - 1 - dx; break;
                    case 6: u = w - 1 - dy; v = dx; break;
                    default: u = w - 1 - dy; v = h - 1 - dx; break;
                }
                plot(px, py, src.getRGB(sx + u, sy + v));
            }
        }
    }

    public void drawString(String s, int x, int y, int anchor) {
        log("drawString \"" + s + "\" " + x + " " + y + " " + anchor + " " + font.id() + " " + Integer.toHexString(color));
        int w = font.stringWidth(s);
        int h = font.getHeight();
        x += tx;
        y += ty;
        if ((anchor & HCENTER) != 0) {
            x -= w / 2;
        } else if ((anchor & RIGHT) != 0) {
            x -= w;
        }
        if ((anchor & BOTTOM) != 0) {
            y -= h;
        } else if ((anchor & BASELINE) != 0) {
            y -= font.getBaselinePosition();
        } else if ((anchor & VCENTER) != 0) {
            y -= h / 2;
        }
        if (Boolean.getBoolean("pretty")) {
            java.awt.Graphics2D g2 = target.createGraphics();
            g2.setClip(clipX, clipY, clipW, clipH);
            g2.setColor(new java.awt.Color(color, true));
            g2.setFont(new java.awt.Font(java.awt.Font.SANS_SERIF, (font.style & Font.STYLE_BOLD) != 0 ? java.awt.Font.BOLD : java.awt.Font.PLAIN, h - 3));
            int cx = x;
            for (int i = 0; i < s.length(); i++) {
                g2.drawString(String.valueOf(s.charAt(i)), cx, y + h - 3);
                cx += font.charWidth(s.charAt(i));
            }
            g2.dispose();
            return;
        }
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            int cw = font.charWidth(c);
            if (c != ' ') {
                for (int yy = y + 1; yy < y + h - 1; yy++) {
                    for (int xx = x; xx < x + cw - 1; xx++) {
                        plot(xx, yy, color);
                    }
                }
            }
            x += cw;
        }
    }

    public void drawChar(char c, int x, int y, int anchor) {
        drawString(String.valueOf(c), x, y, anchor);
    }

    public void drawRGB(int[] rgb, int offset, int scanlength, int x, int y, int w, int h, boolean alpha) {
        log("drawRGB " + x + " " + y + " " + w + " " + h);
        x += tx;
        y += ty;
        for (int row = 0; row < h; row++) {
            for (int col = 0; col < w; col++) {
                int p = rgb[offset + row * scanlength + col];
                plot(x + col, y + row, alpha ? p : (p | 0xFF000000));
            }
        }
    }
}

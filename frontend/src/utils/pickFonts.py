from fontTools.ttLib import TTFont
from fontTools.subset import Subsetter, Options

def extract_glyphs(input_font_path, output_font_path, characters):
    """
    从TTF字体文件中提取指定字符并生成新字体
    
    参数:
        input_font_path: 输入字体文件路径
        output_font_path: 输出字体文件路径
        characters: 需要保留的字符列表
    """
    try:
        # 加载原始字体文件
        font = TTFont(input_font_path)
        
        # 创建子集选项
        options = Options()
        options.desubroutinize = True
        options.hinting = False  # 保留提示信息可以设置为True，但可能会增加文件大小
        
        # 创建子集器
        subsetter = Subsetter(options=options)
        
        # 设置要保留的字符
        subsetter.populate(text=''.join(characters))
        
        # 应用子集
        subsetter.subset(font)
        
        # 保存新字体
        font.save(output_font_path)
        print(f"成功生成新字体文件: {output_font_path}")
        
    except Exception as e:
        print(f"处理字体时出错: {e}")

if __name__ == "__main__":
    # 硬编码的配置
    input_font_path = "ZQZMXS.ttf"  # 输入字体文件路径
    output_font_path = "extracted.ttf"  # 输出字体文件路径
    chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"  # 需要保留的字
    chars_to_keep = list(chars)  # 转换为列表形式
    
    print(f"从 {input_font_path} 提取以下字符: {chars_to_keep}")
    extract_glyphs(input_font_path, output_font_path, chars_to_keep)
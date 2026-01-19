module RuTypograph
  NBSP = "&nbsp;"

  def self.process(text)
    return text if text.nil? || text.strip.empty?

    text = text.dup

    # Кавычки «ёлочки»
    text.gsub!(/"([^"]+)"/, '«\1»')

    # Вложенные кавычки
    text.gsub!(/«([^«»]+)«([^«»]+)»([^«»]+)»/, '«\1„\2“\3»')

    # Длинное тире
    text.gsub!(/(\s|^)-(\s)/, '\1—\2')

    # Неразрывный пробел перед короткими словами
    text.gsub!(/\b(и|а|но|до|для|от|в|к|с|о|у)\s+/i, '\1' + NBSP)

    # Неразрывный пробел: инициалы
    text.gsub!(/([А-ЯЁ])\.\s*([А-ЯЁ])\.\s*([А-ЯЁ][а-яё]+)/, '\1.' + NBSP + '\2.' + NBSP + '\3')

    # Числа: 100 000
    text.gsub!(/(\d)(?=(\d{3})+(\D|$))/, '\1' + NBSP)

    # Диапазоны
    text.gsub!(/(\d+)\s*-\s*(\d+)/, '\1–\2')

    # № и §
    text.gsub!(/№\s*(\d+)/, '№' + NBSP + '\1')
    text.gsub!(/§\s*(\d+)/, '§' + NBSP + '\1')

    # Сокращения
    text.gsub!(/(\d+)\s+(г|стр|рис|табл)\./, '\1' + NBSP + '\2.')

    # Символы
    text.gsub!(/\(c\)/i, '©')
    text.gsub!(/\(tm\)/i, '™')
    text.gsub!(/\(r\)/i, '®')

    text
  end
end

module Jekyll
  module RuTypographFilter
    def ru_typo(input)
      RuTypograph.process(input)
    end
  end
end

Liquid::Template.register_filter(Jekyll::RuTypographFilter)

